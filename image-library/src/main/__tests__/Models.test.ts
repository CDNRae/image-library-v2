import { Image, Tag } from "../database/Models";
import fs from "fs";

jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("Tag Model", () => {
    it("should create a tag with a name", () => {
        const tag = new Tag("tag name");
        expect(tag.name).toBe("tag name");
    });

    it("should throw if name is empty", () => {
        expect(() => new Tag("")).toThrow();
    });
})

describe("Image Model", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an image if the file exists, is a file, and has a permitted extension", () => {
        mockedFs.existsSync.mockReturnValue(true);
        mockedFs.statSync.mockReturnValue({ isFile: () => true } as fs.Stats)

        expect(() => new Image("Image", "/path/to/image.png")).not.toThrow();
    });

    it("should throw if the file exists, is a file, but does not have a permitted extension", () => {
        mockedFs.existsSync.mockReturnValue(true);
        mockedFs.statSync.mockReturnValue({ isFile: () => true } as fs.Stats)

        expect(() => new Image("Image", "/path/to/file.txt")).toThrow();
    });

    it("should throw if the file exists, but is not a file", () => {
        mockedFs.existsSync.mockReturnValue(true);
        mockedFs.statSync.mockReturnValue({ isDirectory: () => true } as fs.Stats)

        expect(() => new Image("Image", "/path/to/directory")).toThrow();
    });

    it("should throw if the file does not exist", () => {
        mockedFs.existsSync.mockReturnValue(false);

        expect(() => new Image("Image", "/path/to/directory")).toThrow();
    });

    it("should throw if name is empty", () => {
        mockedFs.existsSync.mockReturnValue(true);
        mockedFs.statSync.mockReturnValue({ isFile: () => true } as fs.Stats)

        expect(() => new Image("", "path/to/image.png")).toThrow();
    });

    it("should throw if path is empty", () => {
       expect(() => new Image("Name", "")).toThrow();
    });

    it("should throw if path isn't a valid path", () => {
        expect(() => new Image("Name", "invalid path!"))
    });
})