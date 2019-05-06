import { Request, Response, NextFunction} from 'express';
import { EsiidLookupHelper } from './../helper/esiid.lookup.helper';

export class EsiidLookupController {


    public lookUpESIIDByAddressFromESI(req: Request, res: Response, next: NextFunction) {
        var esidLookupHelper = new EsiidLookupHelper();
        esidLookupHelper.lookUpESIIDByAddressFromESI(req).then((s) => res.json(s));
    }

}
