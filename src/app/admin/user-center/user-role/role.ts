import {User} from "../user-list/user";
import {AppKey} from "../../app-manage/app-key-list/app-key";
export class Role {
  public id: number;
  public name: string;
  public remark: string;
  public users: User[];
  public apps: AppKey[];
}
