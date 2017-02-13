import {User} from "../../user-center/user-list/user";
import {App} from "../app-list/app";
export class Openid {
  public uid: string;
  public appid: string;
  public openid: string;
  public create_time: number;
  public user: User;
  public app_key: App;
}
