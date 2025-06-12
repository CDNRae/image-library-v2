import { prisma } from "./prisma";
import { Prisma } from '@prisma/client';

type Tag = Prisma.tagsCreateInput;

export const database = {
    getTags,
    insertTags
};

/**
 * Validates the given hex code by checking its length and contents. Supports
 * 3, 6, and 8 digit hex codes, prefixed with #.
 * @param {[string]} hexCode The hex code to be validated.
 * @returns {[Boolean]} `true` if the hex code is valid; `false` otherwise.
 */
function isValidHexCode(hexCode: string): Boolean {
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    return hexRegex.test(hexCode.trim());
}

async function getTags() {
    return await prisma.tags.findMany();
}

/**
 * Inserts one or more tags into the tags table.
 * @param {[Tag[]]} tags An array of tag objects to be inserted.
 * @returns {Promise<{ success: boolean; failedTags: Tag[] }>} A promise that resolves to an object containing:
 *   - `success`: `true` if at least one tag was successfully inserted.
 *   - `failedTags`: An array of tags that could not be inserted, either due to invalid data or errors.
 */
async function insertTags(tags: Tag[]): Promise<{ success: Boolean; failedTags: Tag[] }> {
    const failedTags: Tag[] = [];

    for (const tag of tags) {
        if (tag.tag_colour && !isValidHexCode(tag.tag_colour as string)) {
            console.warn(`Invalid colour for tag ${tag.tag_name}: ${tag.tag_colour}`)
            failedTags.push(tag);
            continue;
        }

        try {
            await prisma.tags.create({ data: tag });
        } catch (error: unknown) {
            if ((error as any).code === "P2002") {
                console.warn(`Duplicate tag skipped: ${tag.tag_name}`);
                failedTags.push(tag);
            }
            else {
                console.warn(`Error inserting tag ${tag.tag_name}:`, error);
            }
        }
    }

    return { success: true, failedTags }
}