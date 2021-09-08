import { ManageVendorsModule } from './manage-vendors.module';

describe('ManageVendorsModule', () => {
  let manageVendorsModule: ManageVendorsModule;

  beforeEach(() => {
    manageVendorsModule = new ManageVendorsModule();
  });

  it('should create an instance', () => {
    expect(manageVendorsModule).toBeTruthy();
  });
});
