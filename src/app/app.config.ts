import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';

// 1. Aquí traemos TODOS los íconos del sidebar, navbar y formularios
import { 
  AppstoreOutline,
  BellOutline,
  CalendarOutline,
  FileTextOutline,
  FolderOutline,
  InboxOutline,
  LogoutOutline,
  PlusOutline,
  SafetyCertificateOutline,
  SaveOutline,
  SearchOutline,
  ShopOutline,
  TeamOutline,
  UploadOutline
} from '@ant-design/icons-angular/icons';

// 2. Los agregamos al arreglo
const icons = [
  AppstoreOutline,
  BellOutline,
  CalendarOutline,
  FileTextOutline,
  FolderOutline,
  InboxOutline,
  LogoutOutline,
  PlusOutline,
  SafetyCertificateOutline,
  SaveOutline,
  SearchOutline,
  ShopOutline,
  TeamOutline,
  UploadOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    
    // 3. Le pasamos el arreglo completo a NG-ZORRO
    provideNzIcons(icons)
  ],
};