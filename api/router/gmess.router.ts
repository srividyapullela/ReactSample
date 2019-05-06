import {Router, Request, Response, NextFunction} from 'express';
import LoggerUtil from '../logs/log';
import { EsiidLookupController } from '../controllers/esiid.lookup.controller';
import { ManageContractController } from '../controllers/manage.contract.controller';
import { IncentiveOfferController } from '../controllers/incentive.offer.controller';
import { MarketingAgreementController } from '../controllers/marketing.agreement.controller';
import { PreLoginController } from '../controllers/prelogin.controller';
import { UploadFormController } from '../controllers/form.upload.controller';
import { ManageUserController } from '../controllers/manage.user.controller';
import { AdduserController } from '../controllers/add.user.controller';

export class GMESSRouter {

     router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        var esiidLookupController = new EsiidLookupController();
        var manageContractController = new ManageContractController();
        var incentiveOfferController = new IncentiveOfferController();
        var mktAgreementController = new MarketingAgreementController();
        var preloginController = new PreLoginController();
        var uploadFormController = new UploadFormController();
        var manageUserController = new ManageUserController();
        var addUserController = new AdduserController();

        this.router.get('/test', preloginController.test)

        this.router.post('/user/details/sapid', preloginController.getUserDetailsForSapId);

        /* Incentive offers start */
        this.router.post('/createoffer', incentiveOfferController.createOffer);
        this.router.post('/deleteoffer', incentiveOfferController.deleteOffer);
        this.router.post('/listoffers', incentiveOfferController.listOffers);
        this.router.post('/updateoffer', incentiveOfferController.updateOffer);
        /* Incentive offers end */

        this.router.post('/form/upload', uploadFormController.formUpload);


        this.router.post('/lookupesiids', esiidLookupController.lookUpESIIDByAddressFromESI);


        /* Marketing agreement start */
        this.router.post('/mrktagreement/get', mktAgreementController.getMrktAgreement);
        this.router.post('/mrktagreement/create', mktAgreementController.createMrktAgreement);
        this.router.post('/mrktagreement/update/status', mktAgreementController.updatemktagreementsts);
        this.router.post('/mrktagreement/update', mktAgreementController.updateMarketingAgreement);
        /* Marketing agreement end */

        /* Manage user start */
        this.router.post('/user/search', manageUserController.searchUsersForUpdate);
        this.router.post('/user/details', manageUserController.getUserDetailsForUpdate);
        this.router.post('/user/update', manageUserController.updateUser);
        this.router.post('/user/remove', manageUserController.removeUser);
        this.router.post('/user/password/reset', manageUserController.passwordReset);
        this.router.post('/user/customers/disassociate', manageUserController.disassociateUsersToCutomer);
        this.router.post('/user/customers/associatetouser', manageUserController.associateUserToCustomers);
        this.router.post('/user/associate/changeadmin', manageUserController.changeAdminForAssociate);
        /* Manage user end */

        /* add user start*/
        this.router.post('/user/add', addUserController.saveUser);
        this.router.post('/user/bp/search', addUserController.searchBP);
        this.router.post('/user/search/brokers', addUserController.listBrokerAdmins);
        this.router.post('/user/search/customers', addUserController.listCustomerAdmins)
        this.router.post('/user/list/broker/associates', addUserController.listBrokerAssociates)
        this.router.post('/user/verify/sapid', addUserController.isSapIdExistIntheSystem)
        this.router.post('/user/verify/username', addUserController.isUsernameExistIntheSystem)
        this.router.post('/user/list/emm/associates', addUserController.listEMMAssociates)
        this.router.post('/user/list/ema/associates', addUserController.listEMAAssociates)
        this.router.post('/user/list/admin/associates', addUserController.listAdminAssociates);
        this.router.post('/user/list/seladmin/associates', addUserController.listSelectedAdminCustomers)
        /* add user end */

        /* Manage Contract start */
        this.router.post('/contract/search', manageContractController.getContractDetails);
        this.router.post('/contract/save', manageContractController.saveContract);
        this.router.post('/contract/update', manageContractController.updateContract);
        /* Manage Contract end */



    }

}
