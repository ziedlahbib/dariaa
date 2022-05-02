import { Annonce } from "./annonce.model";
import { User } from "./user.model";

export class Avis {
    id:Number;
    note:Number;
    annonce:Annonce;
    user:User;
}
