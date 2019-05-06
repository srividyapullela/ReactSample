import { Request, Response, NextFunction} from 'express';
import { ManageUserHelper } from './../helper/manage.user.helper';

export class ManageUserController {

    public searchUsersForUpdate(req: Request, res: Response, next: NextFunction) {

        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.searchUsersForUpdate(req).then((s) => res.json(s));
    }


    public getUserDetailsForUpdate(req: Request, res: Response, next: NextFunction) {

        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.getUserDetailsForUpdate(req).then(s => res.json(s))
    }


    public updateUser(req: Request, res: Response, next: NextFunction) {

        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.updateUser(req).then(s => res.json(s))
    }


    public passwordReset(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.resetPassword(req).then(s => res.json(s));
    }

    public removeUser(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.removeUser(req).then(s => res.json(s));
    }

    public disassociateUsersToCutomer(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.disassociateUsersToCutomer(req).then(s => res.json(s));
    }

    public associateUserToCustomers(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.associateUsersToCustomer(req).then(s => res.json(s));
    }

    public changeAdminForAssociate(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.changeAdminForAssociate(req).then(s => res.json(s));
    }

}
