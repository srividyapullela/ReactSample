import { Request, Response, NextFunction } from 'express';
import { IncentiveOfferHelper } from './../helper/incentive.offer.helper';

export class IncentiveOfferController {

    private incOffrHelper: IncentiveOfferHelper;
    
    constructor(){
        this.incOffrHelper = new IncentiveOfferHelper();
    }

    public createOffer(req: Request, res: Response, next: NextFunction) {

        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.createOffer(req).then(s => res.json({status:incOffrHelper.getStatusForCreateOffer(s)}));
    }

    public listOffers(req: Request, res: Response, next: NextFunction) {

        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.getOffer(req).then(s => res.json(incOffrHelper.getOfferListFromResponse(s)));
   }

   public deleteOffer(req: Request, res: Response, next: NextFunction) {

        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.deleteOffer(req).then(s => res.json(s));
   }

   public updateOffer(req: Request, res: Response, next: NextFunction) {

        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.updateOffer(req).then(s => res.json({status:incOffrHelper.getStatusForCreateOffer(s)}));
    }

}
