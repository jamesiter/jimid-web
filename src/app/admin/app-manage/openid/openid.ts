import {User} from "../../user-center/user-list/user";
import {AppKey} from "../app-key-list/app-key";
export class Openid {
  public uid: string;
  public appid: string;
  public openid: string;
  public create_time: number;
  public user: User;
  public app_key: AppKey;
}
