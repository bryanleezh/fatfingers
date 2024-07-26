# FatFingers (MonkeyType + TypeRacer)

<div id="top"></div>

<!-- Introduction -->
<br />
<div align="center">
    <h3 align="center"></h3>
    <p align="center">
        MonkeyType aesthetic + TypeRacer's functionality
    </p>
    <p align="center">
        https://fatfingers.vercel.app/
    </p>
</div>

<!-- Table of contents -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li>
            <a href="#about-the-project">About The Project</a>
            <ul>
                <li><a href="#project-features">Project Features</a></li>
                <li><a href="#built-with">Built With</a></li>
                <li><a href="#key-libraries-used">Key Libraries Used</a></li>
            </ul>
        </li>
        <li>
            <a href="#getting-started">Getting Started</a>
            <ul>
                <li><a href="#prerequisites">Prerequisites</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#running-the-front-end">Running the Frontend</a></li>
            </ul>
        </li>
    </ol>
</details>

<!-- About The Project -->

## About The Project

![App Overview][app-screenshot1]
![App Overview][app-screenshot2]
![App Overview][app-screenshot3]
![App Overview][app-screenshot4]

This typing speed site was built as an experimental project to learn to basics of Next.js, which allows users to play a timed game of typing to test how fast the user can type per minute and test the functionality of PartyKit.js for real-time multiplayer possibilities for future projects.

Future Features/Improvements

1. Having accounts to save progress each time test is taken
1. Leaderboard for multiplayer wins

### Project Features

1. Speed typing
1. Results of typing speed etc when game is completed
1. Real-time Multiplayer - Play with your friends! (If you encounter any bugs, contact me!)
1. Themes

### Built With

-   [Next.js](https://nextjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [PartyKit.js](https://www.partykit.io/)

### Key Libraries Used

1. [Shadcn/ui](https://ui.shadcn.com/)
2. [PartyKit.js](https://www.partykit.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Getting Started -->

## Getting Started

To get a local copy up and running, follow these simple example steps

### Prerequisites

-   Node.js
-   NPM

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/bryanleezh/fatfingers.git
    ```

### Running the Application

1. Install NPM packages
    ```sh
    npm install
    ```
2. Duplicate a copy of `.env.local-example` in the same directory, and rename it to `.env`
3. Run the application
    ```sh
    npm run dev
    ```
4. To run PartyKit locally
    ```sh
    npx partykit dev
    ```

<!-- Links -->

<!-- [forks-shield]: https://img.shields.io/github/forks/bryanleezh/money-pig.svg?style=for-the-badge
[forks-url]: https://github.com/bryanleezh/money-pig/network/members
[stars-shield]: https://img.shields.io/github/stars/bryanleezh/money-pig.svg?style=for-the-badge
[stars-url]: https://github.com/bryanleezh/money-pig/stargazers
[issues-shield]: https://img.shields.io/github/issues/bryanleezh/money-pig.svg?style=for-the-badge
[issues-url]: https://github.com/bryanleezh/money-pig/issues -->

[app-screenshot1]: images/single-player.png
[app-screenshot2]: images/multiplayer-landing-page.png
[app-screenshot3]: images/multiplayer-start.png
[app-screenshot4]: images/multiplayer.png
