const token = artifacts.require("MyERC20");
const ico = artifacts.require("ICO");

module.exports = function(deployer) {
  deployer.deploy(token).then(function() {
  return deployer.deploy(ico, token.address);
});
};