import { STORAGE_KEYS } from './../../config/storageKeys.config';
import { Injectable } from '@angular/core';

import { LocalUser } from './../model/localUser';

@Injectable()
export class StorageService {

    public getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        if (!user) {
            return null;
        }

        return JSON.parse(user);
    }

    public setLocalUser(localUser: LocalUser): void {
        if (!localUser) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
        }
    }
}