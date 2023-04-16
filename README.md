# Persuratan DEM UGM 2023

An web based program to send email based on input using dynamically generated form based on sendinblue params template. With extra simple authentication.

## Run the program within platform specific

To run the program, first rename `.env-template` to `.env`. Then edit the value requested inside it.

Then:

### Linux

```sh
    # Give execution permit to the program
    chmod +x entrypoint.sh

    # Then run the program
    ./entrypoint.sh
```

### Windows

```powershell
    # Increase the policy for the current user
    Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    # Then click "yes"

    # Then run the program by using this command:
    .\entrypoint.ps1
```

### MacOs

```sh
    # Give execution permit to the program
    sudo chmod +x entrypoint.zsh

    # Then run the program
    ./entrypoint.zsh
```

To exit the program, simply close the terminal / powershell session

To open the program, open the browser and head to: `localhost:3000` or `127.0.0.1:3000` from your browser.

### Known-Bug

1. When packaged with `pkg`, the next.js cannot running with error message: `Cannot load next.config.js`. I am currently ignore this because this is just one day project requested by a friend. If you have the solution for this, please make an issue so i can learn the way it's done.

2. When the program run with `node server.js` all system work but the next/router doesn't. Idk what make this too, so all the command use `npm run`.

Made with ☕ by Mocho in 2023.
