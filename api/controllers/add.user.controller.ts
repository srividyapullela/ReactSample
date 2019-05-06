import { Request, Response, NextFunction} from 'express';
import { AddUserHelper } from '../helper/adduser.helper';

export class AdduserController {

    public saveUser(req: Request, res: Response, next: NextFunction) {

        var addUserHelper = new AddUserHelper();
        addUserHelper.saveUser(req).then(s => res.json(s));
    }

    public searchBP(req: Request, res: Response, next: NextFunction) {
        var addUserHelper = new AddUserHelper();
        addUserHelper.searchCustomersByBP(req).then(s => res.json(s));
    }

    public listBrokerAdmins(req: Request, res: Response, next: NextFunction) {
        var addUserHelper = new AddUserHelper();
        addUserHelper.searchBrokerAdmins(req).then(s => res.json(s));
    }

    public listCustomerAdmins(req: Request, res: Response, next: NextFunction) {

      var addUserHelper = new AddUserHelper();
      addUserHelper.searchCustomerAdmins(req).then(s => res.json(s));
    }

    public listEMMAssociates(req: Request, res: Response, next: NextFunction) {
        var addUserHelper = new AddUserHelper();
        addUserHelper.listEMMAssociates(req).then(s => res.json(s));
    }

    public listEMAAssociates(req: Request, res: Response, next: NextFunction) {
        var addUserHelper = new AddUserHelper();
        addUserHelper.listEMAAssociates(req).then(s => res.json(s));
    }

    public listBrokerAssociates(req: Request, res: Response, next: NextFunction){
        var addUserHelper = new AddUserHelper();
        addUserHelper.searchBrokerAdmins(req).then(s => res.json(s));
    }


    public isSapIdExistIntheSystem(req: Request, res: Response, next: NextFunction) {

        var addUserHelper = new AddUserHelper();
        addUserHelper.isSapIdExistIntheSystem(req).then(s => res.json(s));
    }

    public isUsernameExistIntheSystem(req: Request, res: Response, next: NextFunction) {
        var addUserHelper = new AddUserHelper();
        addUserHelper.isUsernameExistInLDAP(req).then(s => res.json(s));
    }

    public listAdminAssociates(req: Request, res: Response, next: NextFunction) {
        var addUserHelper = new AddUserHelper();
        addUserHelper.getAssociates(req).then(s => res.json(s));
    }

    public listSelectedAdminCustomers(req: Request, res: Response, next: NextFunction) {
      var addUserHelper = new AddUserHelper();
      addUserHelper.listSelectedAdminCustomers(req).then(s => res.json(s));
    }

}
