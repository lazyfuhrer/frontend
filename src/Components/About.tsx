import {
  Flourish,
  GridContainer,
  Page,
  Header,
  HeaderBack,
} from "../Styles/Components";
import styled from "styled-components";
import { VineyardAddress } from "../Utils/constants";
import Image from "next/image";
import Link from "next/link";
import Roadmap from "./Roadmap";

const VintHeader = styled(Header)`
  padding: 25px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  background: linear-gradient(to right, #4bace9, #7e57c2);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  text-shadow: 64px 36px #957fef50, -72px -16px #b79ced50, 48px -48px #dec0f150;

  animation: blueprint 3s infinite;
`;

const Info1 = styled(Page)`
  padding-top: 3rem;
  margin-bottom: 36px;
`;

const Info2 = styled(Page)`
  background: #f0f0ee;
  margin-top: 16px;
  padding-top: 3rem;
`;

const Info3 = styled(Page)`
  background: #000;
  margin-top: 0;
  padding-top: 3.1rem;
`;

const InfoPanel = styled.div`
  padding: 12px;
  margin: 16px;
  border-radius: 19px;
  background: linear-gradient(145deg, #ffd5ff, #e6b3e1);
  box-shadow: 21px 21px 61px #d6a7d2, -21px -21px 61px #ffe7ff;

  transition: all 200ms ease-out;

  &:hover {
    transform: translate(-4px, -4px);
    transition: all 200ms ease-out;
    box-shadow: 21px 21px 31px #d6a7d2, -21px -21px 31px #ffe7ff;
  }
`;

const Subtitle = styled.h2<{
  side: string;
  color?: string;
  textShadow?: string;
}>`
  margin: 0 3rem 1rem 3rem;
  text-align: ${(props) => (props.side == "left" ? "left" : "right")};
  font-size: 2rem;
  font-style: italic;
  ${(props) => (props.color ? `color: ${props.color};` : "")}

  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")}
`;

const SubSubtitle = styled.h2<{ color?: string }>`
  margin: 2.2rem 2.2rem 2.4rem 3rem;
  text-align: left;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
`;

const Explain = styled.p`
  font-size: 1rem;
`;

const CustomGridContainer = styled(GridContainer)`
  grid-template-columns: fit-content(70%) fit-content(30%);

  @media screen and (max-width: 1280px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: auto;
  }
`;

const CustomGridContainer2 = styled(GridContainer)`
  grid-template-columns: fit-content(30%) fit-content(70%);

  @media screen and (max-width: 1280px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: auto;
  }
`;

const FunImage = styled(Image)`
  border-radius: 16px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  border: 0.5rem solid white;
  box-shadow: 10px 10px;
  margin: auto 24px;
  background-color: white;
  border-radius: 16px;
  padding: 6px;
  transition: all 200ms ease-out;

  &:hover {
    transform: translate(-4px, -4px);
    transition: all 200ms ease-out;
    box-shadow: 14px 14px #d6a7d2, 28px 28px #ffe7ff;
  }
`;

const ImageBox2 = styled.div`
  display: flex;
  justify-content: center;
  border: 0.5rem solid white;
  box-shadow: -10px 10px grey;
  margin: auto 24px;
  background-color: white;
  border-radius: 16px;
  padding: 6px;
  transition: all 200ms ease-out;

  &:hover {
    transform: translate(4px, -4px);
    transition: all 200ms ease-out;
    box-shadow: -14px 14px red, -28px 28px purple;
  }
`;

const CenteredDiv = styled.div`
  justify-content: center;
  display: flex;
`;

const About = () => {
  return (
    <>
      <HeaderBack>
        <VintHeader>The Blueprint</VintHeader>
      </HeaderBack>
      <Info1>
        <Subtitle side="left">
          Hash Valley&apos;s destiny is shaped by its owners
        </Subtitle>
        <SubSubtitle>
          <ol>
            <li>Cultivate a vineyard of your choosing</li>
            <li>Discover rare vintages</li>
            <li>Earn ETH sharing your art with the world</li>
          </ol>
        </SubSubtitle>
        <GridContainer>
          <InfoPanel>
            <h2>
              <i>Vineyards</i>
            </h2>
            <Explain>
              Mintable tokens that yield Wine Bottles if they are planted,
              watered and harvested every season.
            </Explain>
          </InfoPanel>
          <InfoPanel>
            <h2>
              <i>Wine Bottles</i>
            </h2>
            <Explain>
              Grown from a well cared for Vineyard, these can be aged in the
              Cellar and offer voting rights over artwork and secondary market
              royalties.
            </Explain>
          </InfoPanel>
          <InfoPanel>
            <h2>
              <i>Council</i>
            </h2>
            <Explain>
              Vote for the artwork you love or submit your own and claim all
              secondary market royalties plus a special bonus for winning the
              vote.
            </Explain>
          </InfoPanel>
        </GridContainer>
      </Info1>

      <Info2>
        <Subtitle side="right">How Do I Join?</Subtitle>
        <CustomGridContainer>
          <div>
            <SubSubtitle>
              You&apos;ll need to have some ETH on{" "}
              <a
                href="https://www.optimism.io"
                target="_blank"
                rel="noreferrer"
              >
                Optimism
              </a>{" "}
              to get started. You can use{" "}
              <a
                href="https://www.optimism.io/apps/bridges"
                target="_blank"
                rel="noreferrer"
              >
                a bridge
              </a>{" "}
              to move your assets over.
            </SubSubtitle>
            <SubSubtitle>
              After obtaining a Vineyard from the <Link href="/mint">Mint</Link>{" "}
              or on the{" "}
              <a
                href={
                  process.env.NEXT_PUBLIC_CHAIN_ID === "420"
                    ? `https://testnet.qx.app/collection/${VineyardAddress}`
                    : `https://qx.app/collection/${VineyardAddress}`
                }
                target="_blank"
                rel="noreferrer"
              >
                Secondary Market
              </a>
              , wait for the next season to start, plant during the first week
              of the season, water everyday (or buy a sprinkler) and then
              harvest in the final week of the season.
            </SubSubtitle>
            <SubSubtitle>
              Every season is 12 weeks long except for the first season which is
              only three weeks!
            </SubSubtitle>
            <SubSubtitle>
              Once you have a Wine Bottle take your chances aging it in the
              cellar or propose a new artwork in the Council. Winners will have
              their art featured for a minimum of 7 days and receive all
              secondary market royalties.
            </SubSubtitle>
            <SubSubtitle>
              Voting power comes from wine bottle age. Maximize this with the
              Wine Cellar&apos;s Hyperbolic Time Acceleration Technology&trade;
              but keep an eye out - if you leave a bottle too long it may spoil.
            </SubSubtitle>
            <SubSubtitle>
              <a
                href="https://mirror.xyz/0x00000023F6B4ED7185E7B8928072a8bfEC660ff3/9jt6sNUOZ9vjkQRcxgMSClDJCdaJHZwWzX6639hHg6Y"
                target="_blank"
                rel="noreferrer"
              >
                Check out the announcement post on Mirror for a full protocol
                description
              </a>
            </SubSubtitle>
          </div>
          <CenteredDiv>
            <ImageBox>
              <FunImage
                src="/bottles.png"
                alt="logo"
                height={600}
                width={600}
                unoptimized={true}
                loading="eager"
              />
            </ImageBox>
          </CenteredDiv>
        </CustomGridContainer>
      </Info2>

      <Info3>
        <Subtitle side="left" color="white">
          Use Spells to Get Ahead
        </Subtitle>
        <CustomGridContainer2>
          <CenteredDiv>
            <ImageBox2>
              <FunImage
                src="/alchemy.png"
                alt="logo"
                height={600}
                width={600}
                unoptimized={true}
                loading="eager"
              />
            </ImageBox2>
          </CenteredDiv>
          <div>
            <SubSubtitle color="white">
              Earn $GRAPE and $VINEGAR from early harvests and spoiled bottles
            </SubSubtitle>
            <SubSubtitle color="white">
              Use $VINEGAR to recover lost bottles or put a curse on your
              nemesis&apos; vineyard
            </SubSubtitle>
            <SubSubtitle color="white">
              Defend your vineyards from attacks with $GRAPE or power up their
              stats during planting season for increased yield and get ahead of
              the competition
            </SubSubtitle>
          </div>
        </CustomGridContainer2>
      </Info3>

      <Info1>
        <Subtitle side="left">Roadmap</Subtitle>

        <Roadmap
          items={[
            { text: "Vineyard mint opens", complete: true },
            {
              text: "500 mints -> first bonus location unlocks",
              complete: false,
            },
            {
              text: "2500 mints -> second bonus location unlocks",
              complete: false,
            },
            {
              text: "5000 mints -> third bonus location unlocks, all remaining mints receive $GRAPE and $VINEGAR airdrop",
              complete: false,
            },
            { text: "Mint out -> start first season", complete: false },
            {
              text: "New artwork creation opens up to everyone",
              complete: false,
            },
            {
              text: "Create Snapshot page for community signaling on future expansions",
              complete: false,
            },
            {
              text: "Engage generative artists to be featured",
              complete: false,
            },
            {
              text: "Launch DAO for protocol management",
              complete: false,
            },
          ]}
        />
        <h2>
          <i>FUTURE CONCEPTION</i>
        </h2>
        <Roadmap
          items={[
            {
              text: "Expansion packs to upgrade your Vineyard - customizable cosmetics, deeper control over wine making and more",
              complete: false,
            },
            {
              text: "Themed derivative projects - expand your operations into other industries",
              complete: false,
            },
            {
              text: "Turn your bottles into real wines with the Hash Valley label",
              complete: false,
            },
          ]}
        />
      </Info1>

      <Info1>
        <Subtitle side="left">Wanna go Deeper?</Subtitle>
        <SubSubtitle>
          <a
            href="https://inathan-m.gitbook.io/hash-valley-winery/"
            target="_blank"
            rel="noreferrer"
          >
            Read the docs
          </a>{" "}
          or take a look at the{" "}
          <a
            href="https://github.com/hash-valley"
            target="_blank"
            rel="noreferrer"
          >
            codebase
          </a>{" "}
          to see more. Happy vinting!
        </SubSubtitle>
      </Info1>

      <Flourish>
        <br />
        <Image
          src="/vine_svgs/flourish.svg"
          alt="flourish"
          height={80}
          width={300}
        />
        <br />
      </Flourish>
    </>
  );
};

export default About;
