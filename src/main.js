import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
// import { AppModule } from './app/';
if (environment.production) {
    enableProdMode();
}
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map