import { Request, Response, NextFunction} from 'express';
import { ManageContractHelper } from './../helper/manage.contract.helper';

export class ManageContractController {

    public getContractDetails(req: Request, res: Response, next: NextFunction) {
        var manageContractHelper = new ManageContractHelper();
        manageContractHelper.getContractDetails(req).then((s) => res.json(s));
    }

    public saveContract(req: Request, res: Response, next: NextFunction) {
        var manageContractHelper = new ManageContractHelper();
        manageContractHelper.saveContract(req).then((s) => res.json(s));
    }

    public updateContract(req: Request, res: Response, next: NextFunction) {
        var manageContractHelper = new ManageContractHelper();
        manageContractHelper.updateContract(req).then((s) => res.json(s));
    }

}
