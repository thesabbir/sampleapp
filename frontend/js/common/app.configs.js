angular.module('app.configs', [])

  .provider('$sampleAppConfig', function () {
    var mainConfig = {
      name: 'Sample App',
      copyright: '2014 by Sabbir Ahmed',
      version: '0.0.1'
    };

    return {

      setName: function (name ) {
        mainConfig.name = name;
      },

      $get: function () {
        return {
          getDefault: function () {
            return mainConfig;
          }
        }
      }


    };
  }
);
