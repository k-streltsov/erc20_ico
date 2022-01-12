const MyERC20 = artifacts.require("MyERC20");
const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract("MyERC20", (accounts) => {
    let [owner, alice, bob] = accounts;
	beforeEach(async () => {
        contract = await MyERC20.new();
    });
	it("only owner can fill whitelist", async () => {
		const result = await contract.addWhitelisted(alice, {from: owner});
		assert.equal(result.receipt.status, true);
		await utils.shouldThrow(contract.addWhitelisted(bob, {from: alice}));
	})
	it("only whitelisted users can transfer token", async () => {
		await contract.transfer(alice, 5, {from: owner});
		await utils.shouldThrow(contract.transfer(bob, 3, {from: alice}));
		await contract.addWhitelisted(alice, {from: owner});
		await contract.transfer(bob, 3, {from: alice});
	})
})