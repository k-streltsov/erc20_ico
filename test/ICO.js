const token = artifacts.require("MyERC20");
const ICO = artifacts.require("ICO");

const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract("ICO", (accounts) => {
	let [owner, alice] = accounts;
	beforeEach(async () => {
        tokenInstance = await token.new();
		icoInstance = await ICO.new(tokenInstance.address);
		
		await tokenInstance.addWhitelisted(icoInstance.address);
		await tokenInstance.transfer(icoInstance.address, 10000);
    });
	
	it("first period test", async () => {
		await icoInstance.buy({from: alice, value: web3.utils.toWei("2", "ether")});
		let result = await tokenInstance.balanceOf(alice);
		assert.equal(result.toNumber(), 84);
	})
	
	it("second period test", async () => {
		await time.increase(time.duration.days(4));
		await icoInstance.buy({from: alice, value: web3.utils.toWei("1", "ether")});
		let result = await tokenInstance.balanceOf(alice);
		assert.equal(result.toNumber(), 21);
	})
	
	it("third period test", async () => {
		await time.increase(time.duration.days(35));
		await icoInstance.buy({from: alice, value: web3.utils.toWei("8", "ether")});
		let result = await tokenInstance.balanceOf(alice);
		assert.equal(result.toNumber(), 64);
	})
	
	it("should not be able buy tokens after deadline", async () => {
		await time.increase(time.duration.days(60));
		await utils.shouldThrow(icoInstance.buy({from: alice, value: web3.utils.toWei("8", "ether")}));
	})
})