import { rm } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist");
const disabledOutputs = [
	"anime",
	"anime-list.json",
	"bangumi",
	"dynamic",
	"friends",
	"gallery",
	"guestbook",
	"sponsor",
	"api/dynamic.json",
	"pio",
	"assets/music",
	"assets/images/ad",
	"assets/images/sponsor",
];

for (const relativePath of disabledOutputs) {
	const target = path.resolve(outputDirectory, relativePath);
	if (!target.startsWith(`${outputDirectory}${path.sep}`)) {
		throw new Error(`Refusing to remove path outside dist: ${target}`);
	}
	await rm(target, { recursive: true, force: true });
}

console.log(`Pruned ${disabledOutputs.length} disabled pages and template asset paths.`);
