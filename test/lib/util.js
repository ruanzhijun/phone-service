var util = require('../../lib/util');
var should = require('should');
describe('#util', function() {
  it('#getSupplierPrefix()', function() {
    util.getSupplierPrefix().should.be.equal('中国');
  });
  it('#getSupplierEnglishPrefix()', function() {
    util.getSupplierEnglishPrefix().should.be.equal('China_');
  });
  it('#getChinaMobileAbbreviation()', function() {
    util.getChinaMobileAbbreviation().should.be.equal(util.getSupplierEnglishPrefix() + 'Mobile');
  });
  it('#getChinaTelecomAbbreviation()', function() {
    util.getChinaTelecomAbbreviation().should.be.equal(util.getSupplierEnglishPrefix() + 'Telecom');
  });
  it('#getChinaUnicomAbbreviation()', function() {
    util.getChinaUnicomAbbreviation().should.be.equal(util.getSupplierEnglishPrefix() + 'Unicom');
  });
  it('#isChinaMobile()', function() {
    util.isChinaMobile(util.getSupplierEnglishPrefix() + 'Mobile').should.be.equal(true);
  });
  it('#isChinaTelecom()', function() {
    util.isChinaTelecom(util.getSupplierEnglishPrefix() + 'Telecom').should.be.equal(true);
  });
  it('#isChinaUnicom()', function() {
    util.isChinaUnicom(util.getSupplierEnglishPrefix() + 'Unicom').should.be.equal(true);
  });
  describe('getSupplierEnglishName', function() {
    it('#getSupplierEnglishName()', function() {
      util.getSupplierEnglishName('广东移动').should.be.equal(util.getChinaMobileAbbreviation());
    });
    it('#getSupplierEnglishName()', function() {
      util.getSupplierEnglishName('广东电信').should.be.equal(util.getChinaTelecomAbbreviation());
    });
    it('#getSupplierEnglishName()', function() {
      util.getSupplierEnglishName('广东联通').should.be.equal(util.getChinaUnicomAbbreviation());
    });
  });
  describe('getSupplierName', function() {
    it('#getSupplierName()', function() {
      util.getSupplierName('广东移动').should.be.equal(util.getSupplierPrefix() + '移动');
    });
    it('#getSupplierName()', function() {
      util.getSupplierName('广东电信').should.be.equal(util.getSupplierPrefix() + '电信');
    });
    it('#getSupplierName()', function() {
      util.getSupplierName('广东联通').should.be.equal(util.getSupplierPrefix() + '联通');
    });
  });
  it('#loadPlugin()', function() {
    util.loadPlugin('360').should.have.properties(['name', 'parse']);
  });
  it('#isFunction()', function() {
    util.isFunction(function() {}).should.be.equal(true);
    util.isFunction(11).should.be.equal(false);
  });
  it('#isObject()', function() {
    util.isObject({}).should.be.equal(true);
    util.isObject(11).should.be.equal(false);
  });
  it('#isArray()', function() {
    util.isArray([]).should.be.equal(true);
    util.isArray(11).should.be.equal(false);
  });
  it('#isString()', function() {
    util.isString('11').should.be.equal(true);
    util.isString(11).should.be.equal(false);
  });
  it('#isBoolean()', function() {
    util.isBoolean(false).should.be.equal(true);
    util.isBoolean(11).should.be.equal(false);
  });
  it('#isType()', function() {
    util.isType('11', 'String').should.be.equal(true);
    util.isType(11, 'Number').should.be.equal(true);
  });
  it('#isEmpty()', function() {
    util.isEmpty('11').should.be.equal(false);
    util.isEmpty().should.be.equal(true);
    util.isEmpty(1).should.be.equal(false);
    util.isEmpty(true).should.be.equal(false);
    util.isEmpty('').should.be.equal(true);
    util.isEmpty([]).should.be.equal(true);
    util.isEmpty({}).should.be.equal(true);
    util.isEmpty(null).should.be.equal(true);
    util.isEmpty(false).should.be.equal(true);
    util.isEmpty(0).should.be.equal(true);
    util.isEmpty(undefined).should.be.equal(true);
  });
  it('#extend()', function() {
    util.extend({
      a: 1
    }, {
      a: 2,
      b: 1
    }).should.have.properties({
      a: 2,
      b: 1
    });
  });
  it('#clone()', function() {
    util.clone({
      a: 2,
      b: 1
    }).should.have.properties({
      a: 2,
      b: 1
    });
    util.clone([1, 2]).should.have.lengthOf(2);
  });
  it('#parseReturn()', function() {
    util.parseReturn(15900000000, {}).should.be.empty();
    util.parseReturn(15900000000, {
      a: 1
    }).should.have.properties({
      a: 1
    });
    util.parseReturn(15900000000, {
      supplier: "移动"
    }).should.have.properties({
      abbreviation: util.getChinaMobileAbbreviation(),
      phone: 15900000000,
      supplier: util.getSupplierName('移动')
    });
  });
  it('#getErrorMsg()', function() {
    util.getErrorMsg(1590000000).should.be.equal('1590000000 is not a phone number.');
  });
  it('#getSupplierKey()', function() {
    util.getSupplierKey().should.be.equal('supplier');
  });
  it('#getProvinceKey()', function() {
    util.getProvinceKey().should.be.equal('provice');
  });
  it('#getCityKey()', function() {
    util.getCityKey().should.be.equal('city');
  });
  it('#getStaticRegExpPhoneList()', function() {
    var staticRegExpPhoneList = util.getStaticRegExpPhoneList();
    staticRegExpPhoneList.should.have.lengthOf(3);
  });
});