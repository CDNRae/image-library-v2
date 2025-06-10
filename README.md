# image-library-v2
The successor to [Image Library](https://github.com/CDNRae/image-library).

This tool aims to help artists by providing a central location to view their reference photos, which may be scattered across their drive or meticulously organized in folders that are difficult to navigate. Tagging and filtering tools allow users to quickly find only the images relevant to them, eliminating the need to open dozens of image files at once.

This project is very much a work-in-progress; key features are still missing at this time, and will be added on with future updates.

## Set-Up
This project requires Node.js version 22.16.0 or higher; for all other requirements, see <a href="./package.json">package.json</a>.

After cloning this repo, run `npm install` from the project root to install the required packages.

## Usage
To run the program, enter `npm run <script>` in the console, where `<script>` is one of the following:

- `dev`: Runs the renderer, main process, and Electron app concurrently; your bread-and-butter for development work. The renderer and main process will recompile when files are changed.
- `renderer`: Runs just the Vite development server for the renderer process.
- `electron`: Runs just the Electron app; requires the main process to be compiled separately (i.e. via `main`).
- `main`: Compiles the main process for Electron, and automatically recompiles on file changes.
- `test`: Runs the entire test suite using Jest.


## To-Do
- Finish mocking tests for the Image and Tag models
    - Finish the validation logic and functions for the Image and Tag models
- Set up a proper database to track the name, path, and tags of "stored" images
- Implement file-browsing to add images to the app
- Implement drag-and-drop to add images to the app
- Implement name editing for images
- Implement the tagging system
    - Create tags
    - Delete tags
    - Add tags to an image
    - Remove tags from an image
    - Filter the gallery by tags