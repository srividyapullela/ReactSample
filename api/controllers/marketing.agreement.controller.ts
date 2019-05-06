import { Request, Response, NextFunction} from 'express';
import { MarketingAgreementHelper } from './../helper/marketing.agreement.helper';

export class MarketingAgreementController {

    public getMrktAgreement(req: Request, res: Response, next: NextFunction) {

        var marketingAgreementHelper = new MarketingAgreementHelper();
        marketingAgreementHelper.getMrktAgreement(req).then(s => res.json(s));
    }

    public createMrktAgreement(req: Request, res: Response, next: NextFunction) {

        var marketingAgreementHelper = new MarketingAgreementHelper();
        marketingAgreementHelper.createMrktAgreement(req).then((s) => res.json(s));
    }

    public updatemktagreementsts(req: Request, res: Response, next: NextFunction) {

        var marketingAgreementHelper = new MarketingAgreementHelper();
        marketingAgreementHelper.updatemktagreementsts(req).then((s) => res.json(s));
    }

    public updateMarketingAgreement(req: Request, res: Response, next: NextFunction) {
            
        var marketingAgreementHelper = new MarketingAgreementHelper();
        marketingAgreementHelper.updateMarketingAgreement(req).then((s) => res.json(s));
    }

}
