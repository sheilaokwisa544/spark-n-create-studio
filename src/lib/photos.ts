import studioPartyTable from "@/assets/studio-party-table.png.asset.json";
import outdoorArtParty from "@/assets/outdoor-art-party.png.asset.json";
import schoolArtClub from "@/assets/school-art-club.png.asset.json";
import workshopTable from "@/assets/workshop-table.png.asset.json";
import miniCanvasArtwork from "@/assets/mini-canvas-artwork.png.asset.json";
import handprintFlowers from "@/assets/handprint-flowers.png.asset.json";
import handprintTree from "@/assets/handprint-tree.png.asset.json";
import fingerprintBalloon from "@/assets/fingerprint-balloon.png.asset.json";
import tshirtLeaves from "@/assets/tshirt-leaves.png.asset.json";
import tshirtWave from "@/assets/tshirt-wave.png.asset.json";

/** Real ChoraNami photography, grouped by what each image actually shows. */
export const photos = {
  partyTable: studioPartyTable.url,
  outdoorParty: outdoorArtParty.url,
  schoolClub: schoolArtClub.url,
  workshopTable: workshopTable.url,
  miniCanvases: miniCanvasArtwork.url,
  handprintFlowers: handprintFlowers.url,
  handprintTree: handprintTree.url,
  fingerprintBalloon: fingerprintBalloon.url,
  tshirtLeaves: tshirtLeaves.url,
  tshirtWave: tshirtWave.url,
} as const;

export const galleryPhotos = [
  { url: photos.schoolClub, title: "Splash-mat easel setup", category: "School Art Clubs" },
  { url: photos.partyTable, title: "Party table ready to paint", category: "Birthday Parties" },
  { url: photos.handprintTree, title: "Four-seasons handprint tree", category: "Children's Artwork" },
  { url: photos.tshirtWave, title: "Hand-painted wave tee", category: "T-Shirt Painting" },
  { url: photos.workshopTable, title: "Planting & painting workshop", category: "Homeschool Lessons" },
  { url: photos.miniCanvases, title: "Mini canvas showcase", category: "Canvas Painting" },
  { url: photos.outdoorParty, title: "Garden art party", category: "Birthday Parties" },
  { url: photos.handprintFlowers, title: "Handprint flower garden", category: "Children's Artwork" },
  { url: photos.fingerprintBalloon, title: "Fingerprint hot-air balloon", category: "Children's Artwork" },
  { url: photos.tshirtLeaves, title: "Botanical tee printing", category: "T-Shirt Painting" },
];
