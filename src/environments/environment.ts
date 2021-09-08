// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  // FOR LOCAL

  serviceUrl: 'http://192.168.1.132:8077/Recruitment/',
  jcrURL: 'http://192.168.1.132:8888/digital/',
  authUrl: 'http://192.168.1.132:8080/',
   elasticSearchUrl: 'http://192.168.1.132:9191',
   vendorUrl: 'http://192.168.1.132:8889/Vendor/', 
   employeeUrl: 'http://192.168.1.132:8322/referral/',


  // serviceUrl: 'http://192.168.1.11' + `:8080` + `/`,
  // jcrURL: 'http://192.168.1.11' + `:8080` + `/digital-lib-app/`,
  // authUrl: 'http://192.168.1.11' + `:8080` + `/`,
  // elasticSearchUrl: 'http://192.168.1.11:9200',
  // vendorUrl: 'http://192.168.1.11' + `:8080` + `/vendor/`,
  // employeeUrl: 'http://192.168.1.11:8080/referral/',
};
