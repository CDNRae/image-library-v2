import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "../prisma";
import { database } from "../database";
import { Prisma } from "@prisma/client";

vi.mock("../prisma", () => ({
    prisma: {
        tags: {
            create: vi.fn(),
            findMany: vi.fn()
        }
    }
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("insertTags", () => {
    it("should insert tags successfully", async () => {
        const tags = [
            { tag_name: "tag1" },
            { tag_name: "tag2", tag_colour: "#fff" },
            { tag_name: "tag3", tag_colour: "#2b2b2b" },
        ];

        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag1" });
        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag2", tag_colour: "#fff" });
        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag3", tag_colour: "#2b2b2b" });

        const result = await database.insertTags(tags);

        expect(result.success).toBe(true);
        expect(result.failedTags).toHaveLength(0);
        expect(prisma.tags.create).toHaveBeenCalledTimes(3);
        expect(prisma.tags.create).toHaveBeenCalledWith({ data: { tag_name: "tag1" } });
        expect(prisma.tags.create).toHaveBeenCalledWith({ data: { tag_name: "tag2", tag_colour: "#fff" } });
        expect(prisma.tags.create).toHaveBeenCalledWith({ data: { tag_name: "tag3", tag_colour: "#2b2b2b" } });
    });

    it("should skip duplicate tags when inserting", async () => {
        const tags = [
            { tag_name: "tag1" },
            { tag_name: "tag1" }
        ];

        const duplicateError = new Error("Mocked duplicate tags error");
        (duplicateError as any).code = "P2002";

        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag1" });
        // @ts-ignore
        prisma.tags.create.mockRejectedValueOnce(duplicateError);

        const result = await database.insertTags(tags);

        expect(result.success).toBe(true);
        expect(result.failedTags).toHaveLength(1);
        expect(result.failedTags[0]).toEqual({ tag_name: 'tag1' });
        expect(prisma.tags.create).toHaveBeenCalledTimes(2);
    });

    it("should skip tags with bad colour values", async () => {
        // The first three tags are valid colours; the rest aren't
        const tags = [
            { tag_name: "tag1", tag_colour: "#000" },
            { tag_name: "tag2", tag_colour: "#000000" },
            { tag_name: "tag3", tag_colour: "#00000080" },
            { tag_name: "tag4", tag_colour: "#ggg" },
            { tag_name: "tag5", tag_colour: "#g1g1g1" },
            { tag_name: "tag6", tag_colour: "000000" },
            { tag_name: "tag7", tag_colour: "#0000" },
        ];

        const colourError = new Error("Mocked colour error.");

        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag1", tag_colour: "#000" });
        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag2", tag_colour: "#000000" });
        // @ts-ignore
        prisma.tags.create.mockResolvedValueOnce({ tag_name: "tag3", tag_colour: "#00000080" });

        // One reject per bad tag
        // @ts-ignore
        prisma.tags.create.mockRejectedValueOnce(colourError);
        // @ts-ignore
        prisma.tags.create.mockRejectedValueOnce(colourError);
        // @ts-ignore
        prisma.tags.create.mockRejectedValueOnce(colourError);
        // @ts-ignore
        prisma.tags.create.mockRejectedValueOnce(colourError);

        const result = await database.insertTags(tags);

        expect(result.success).toBe(true);
        expect(result.failedTags).toHaveLength(4);
        expect(result.failedTags).toEqual([
            { tag_name: "tag4", tag_colour: "#ggg" },
            { tag_name: "tag5", tag_colour: "#g1g1g1" },
            { tag_name: "tag6", tag_colour: "000000" },
            { tag_name: "tag7", tag_colour: "#0000" },
        ]);
        expect(prisma.tags.create).toHaveBeenCalledTimes(3);
    });
});
