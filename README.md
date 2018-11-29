# Mmdb

Movie application which users are able to share their watchlists and rate movies/tv shows.

## Getting Started

You must have the following prerequisites before running the application.

### Prerequisites

1. [Nodejs](https://nodejs.org/en/download/)
2. Npm
3. Yarn
4. Expo
5. React Native

### Installing

If you have all the prerequisites, follow these steps to running your application:

1. Clone the repo 

    ```git clone https://github.com/lukepaoloni/movie-app.git MovieApp```

2. Navigate to the project folder 

    ```cd MovieApp```

3. Run the package installer

    ```npm install```

4. Build and compile the javascript files

    ```yarn buildAndStart```

5. Deploy app to expo/emulator (note that if you're trying to use `react-native` to deploy the app, you must have the ios and android folders in the project root folder. If this is currently not in there, run `expo eject` before doing below commands)

    Expo - ```expo start```

    Android - ```react-native run-android```

    iOS - ```react-native run-ios```


## Prerequisites Installation

Follow these steps if you don't have the prerequisites:

1. Download [Nodejs](https://nodejs.org/en/download/). If you download the Windows Binary zip folder, you can extra to a folder location and run node/npm from there. 

2. Navigate to the nodejs folder which you've unzipped. For example:

    ```cd E:/Apps/NodeJs```

3. Install Yarn, Expo, React Native

    ```npm install yarn expo-cli react-native-cli```

4. (Optional) Download and unzip [Cmder](http://cmder.net/) and open up Cmder

6. (Optional) Open `user_aliases.cmd` in a code editor.

    ```cd E:/Apps/Cmder/config```

    ```code user_aliases.cmd```

7. Copy and paste the following into that file *replace the appropriate location to where you've placed your folders*:

    ```
    npm="C:/Users/b5018822/Apps/NodeJs/npm" $*
    yarn="C:/Users/b5018822/Apps/NodeJs/yarn" $*
    node="C:/Users/b5018822/Apps/NodeJs/node.exe" $*
    expo="C:/Users/b5018822/Apps/NodeJs/expo" $*
    react-native="C:/Users/b5018822/Apps/NodeJs/react-native" $*
    ```

8. Open up a new Cmder window and you can run those commands from any location.


## Running the tests


## Git

Some helpful commands you will need to use to commit the changes you've made. (Use Cmder)

#### Pushing to the repository

1. ```git add .```
2. ```git commit -m "YOUR COMMENTS GOES HERE"```
3. ```git push origin master```

#### Pulling from the repository & then push to the repository

1. ```git add .```
2. ```git commit -m "YOUR COMMENTS GOES HERE"```
3. ```git pull origin master```

#### If you get CONFLICTS, open Visual Code (with the project inside), find the conflicts and fix them.

1. `Accept incoming change` means, accept the change that's stored on the repository.
2. `Accept current change` means, accept the change that you've made currently.


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Common Issues
when running npm if you get the message "device is not ready"
check [user-aliases.cmd] of cmber
Usually saved here "E:\Applications\Cmder\config"

1. Issue: `import { createAppContainer } from 'react-navigation';` - Module '"f:/Projects/MobileApps/MovieApp/node_modules/@types/react-navigation/index"' has no exported member 'createAppContainer'. [2305]
    
    Fix: Navigate to the @types/react-navigation/index.d.ts file and export the member. and in the typed function createAppContainer
    
    `
        export function createAppContainer(
            routeConfigMap: NavigationRouteConfig
        ): NavigationContainer;
    
    `

2. Issue: `'node' is not recognized as an internal or external command`

    Fix: `npm config set scripts-prepend-node-path true` then try `npm install` again.

3. virtualizedList type script error 'export class VirtualizedList<ItemT> extends React.Component<
  VirtualizedListProps<ItemT>
> {
  scrollToEnd: (params?: { animated?: boolean }) => void;
  scrollToIndex: (
    params: {
      animated?: boolean;
      index: number;
      viewOffset?: number;
      viewPosition?: number;
    }
  ) => void;
  scrollToItem: (
    params: { animated?: boolean; item: ItemT; viewPosition?: number }
  ) => void;
  scrollToOffset: (params: { animated?: boolean; offset: number }) => void;
  recordInteraction: () => void;
}'
    import that here 'E:\Applications\reactApp\movie-app\node_modules\@types\react-native\index.d.ts' yours may be different
## Authors
