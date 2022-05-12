import { useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { useRouter } from "next/router";
import {
  Farmable,
  plant,
  water,
  harvest,
  fetchTokenFarmingStats,
  untilCanWater,
  canWaterUntil,
  getStreak,
  historicalUriIpfs,
  buySprinkler,
} from "../../Utils/vineyardContract";
import {
  locations,
  soilTypes,
  hours,
  minutes,
  seconds,
  toDate,
} from "../../Utils/utils";
import { useCurrSeason } from "../../Hooks/useCurrSeason";
import { useQuery } from "@apollo/client";
import { VINEYARD_QUERY } from "../../Utils/queries";
import {
  Page,
  SuccessText,
  FailText,
  Spaced,
  GreyLink,
  TokenFrame,
  CenteredSelect,
  TokenPage,
  TokenSign,
} from "../../Styles/Components";
import { useVineVersions } from "../../Hooks/useUriVersions";
import Select from "rc-select";
import { Button } from "antd";

const VineyardPage = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { id } = router.query;
  const uriVersions = useVineVersions();
  const season = useCurrSeason();
  const [nullData, setNullData] = useState(true);
  const [waterStatus, setWaterStatus] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [uriVersion, setUriVersion] = useState(0);
  const [streak, setStreak] = useState(0);

  const [farmable, setFarmable] = useState<Farmable>({
    canWater: false,
    canHarvest: false,
    canPlant: false,
  });

  const { loading, error, data, refetch } = useQuery(VINEYARD_QUERY, {
    variables: { id: "0x" + id?.toString() },
  });

  const changeImage = async (n: number) => {
    if (!loading) {
      let uri = await historicalUriIpfs(n);
      uri =
        uri +
        "/?seed=" +
        data.vineyard.location +
        "-" +
        Math.abs(data.vineyard.elevation) +
        "-" +
        (data.vineyard.elevation < 0 ? "1" : "0") +
        "-" +
        data.vineyard.soil +
        "-" +
        data.vineyard.xp;
      setUriVersion(n);
      setImageUri(uri);
    }
  };

  useEffect(() => {
    changeImage(uriVersions[uriVersions.length - 1]);
  }, [uriVersions, id]);

  useEffect(() => {
    let myInterval: any;
    const fetchBalance = async () => {
      if (data.vineyard) {
        setNullData(false);
        setStreak(await getStreak(Number(id)));
        const farmableParams = await fetchTokenFarmingStats(
          parseInt(id.toString())
        );
        setFarmable(farmableParams);

        let waterCountdown: number = -1;
        if (!farmableParams.canPlant) {
          if (farmableParams.canWater) {
            waterCountdown = await canWaterUntil(Number(id));
          } else {
            waterCountdown = await untilCanWater(Number(id));
          }
        }
        setWaterStatus(waterCountdown);

        myInterval = setInterval(() => {
          if (waterCountdown === 0) {
            clearInterval(myInterval);
          } else {
            setWaterStatus(waterCountdown--);
          }
        }, 1000);
      }
    };
    if (!loading && !error) fetchBalance();
    return () => clearInterval(myInterval);
  }, [loading]);

  useEffect(() => {
    refetch();
  }, [wallet, id]);

  return loading ? (
    <Page>
      <h3>Vineyard: {id}</h3>
      <br />
      <h4>
        <i>Loading...</i>
      </h4>
    </Page>
  ) : nullData ? (
    <Page>
      <h3>Vineyard {id}</h3>
      <br />
      <h4>Vineyard not found</h4>
    </Page>
  ) : (
    <TokenPage>
      <h3>Vineyard {id}</h3>
      <TokenFrame src={imageUri} frameBorder="0" />
      <br />
      <CenteredSelect
        value={uriVersion}
        onChange={(event: any) => changeImage(event.target.value)}
      >
        {uriVersions.map((n) => (
          <Select.Option key={n} value={n}>
            Version {n}
          </Select.Option>
        ))}
      </CenteredSelect>
      <TokenSign>
        <div>
          <b>TokenId:</b> {id}
        </div>
        <br />
        <div>
          <b>Location:</b> {locations[data.vineyard.location].name}
        </div>
        <div>
          <b>Climate:</b> {locations[data.vineyard.location].climate.name}
        </div>
        <div>
          <b>Elevation:</b> {data.vineyard.elevation}
        </div>
        <div>
          <b>Soil:</b> {soilTypes[data.vineyard.soil].name}
        </div>
        <div>
          <b>XP:</b> {data.vineyard.xp}
        </div>
        <div>
          <b>Streak:</b> {streak}
        </div>
        <div>
          {data.vineyard.sprinklerExpires &&
          Number(data.vineyard.sprinklerExpires) > Date.now() / 1000 ? (
            <>
              <b>Sprinkler expires:</b> {toDate(data.vineyard.sprinklerExpires)}
            </>
          ) : (
            <>
              <b>No Sprinkler</b>
              <Button
                type="text"
                size="middle"
                onClick={() =>
                  buySprinkler(wallet, Number(data.vineyard.tokenId))
                }
              >
                Buy Sprinkler (0.01 Ξ)
              </Button>
            </>
          )}
        </div>
        <br />

        {farmable.canHarvest ? (
          <SuccessText>Harvestable</SuccessText>
        ) : data.vineyard.seasonsHarvested.includes(season) ? (
          <SuccessText>Already harvested this season</SuccessText>
        ) : farmable.canWater ? (
          <SuccessText>
            Can water until {hours(waterStatus)}:{minutes(waterStatus)}:
            {seconds(waterStatus)}
          </SuccessText>
        ) : waterStatus >= 0 ? (
          <SuccessText>
            Can water in {hours(waterStatus)}:{minutes(waterStatus)}:
            {seconds(waterStatus)}
          </SuccessText>
        ) : farmable.canPlant ? (
          <SuccessText>Plantable</SuccessText>
        ) : (
          <FailText>Vineyard is dead for this season</FailText>
        )}
      </TokenSign>

      {wallet.account?.toLowerCase() === data.vineyard.owner.id ? (
        <div>
          <Spaced
            type="primary"
            shape="round"
            disabled={farmable.canWater ? false : true}
            onClick={() => water(wallet, Number(id))}
          >
            Water
          </Spaced>
          <Spaced
            type="primary"
            shape="round"
            disabled={farmable.canPlant ? false : true}
            onClick={() => plant(wallet, Number(id))}
          >
            Plant
          </Spaced>
          <Spaced
            type="primary"
            shape="round"
            disabled={farmable.canHarvest ? false : true}
            onClick={() => harvest(wallet, Number(id))}
          >
            Harvest
          </Spaced>
        </div>
      ) : (
        <p>Owned by {data.vineyard.owner.id}</p>
      )}
      {data.vineyard.bottles ? (
        <div>
          Wine Bottles harvested from this vineyard:
          <br />
          {data.vineyard.bottles.map((bottle: any) => (
            <div key={bottle.id}>
              <GreyLink href={"/bottle/" + parseInt(bottle.id).toString()}>
                <a>Bottle #{parseInt(bottle.id)}</a>
              </GreyLink>
            </div>
          ))}
        </div>
      ) : null}
    </TokenPage>
  );
};

export default VineyardPage;
