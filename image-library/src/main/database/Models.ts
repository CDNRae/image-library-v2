export class Image {
    name: string;
    path: string;
    tags: Set<Tag>;

    constructor(name: string, path: string, tags: Set<Tag> = new Set<Tag>()) {
        if (!name.trim()) throw new Error("Tag name cannot be empty.");
        if (!path.trim()) throw new Error("Path cannot be empty.");

        this.name = name;
        this.path = path;
        this.tags = tags;
    }
}

export class Tag {
    name: string;
    colour: string;

    constructor(name: string, colour: string = "") {
        if (!name.trim()) throw new Error("Tag name cannot be empty.");

        // Colour CAN be empty; if it isn't, it must be a valid hex code.
        if (colour.trim() && !colour.match('^#([0-9A-F]{3}){1,2}$')) {
            throw new Error("Tag colour is not a valid hex code. Transparency is not supported.");
        }

        this.name = name;
        this.colour = colour;
    }
}