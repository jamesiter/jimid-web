import {User} from "../user-list/user";
import {App} from "../../app-manage/app-list/app";
export class Role {
  public id: number;
  public name: string;
  public remark: string;
  public users: User[];
  public apps: App[];
}
