async function main() {
    const proxyAddress = '0x3cb36436A7bfF8CA656a243346100fDC589CcF83';    // proxy address not the admin of the proxy.  
    const P3 = await ethers.getContractFactory("Phase3");
    console.log("Preparing upgrade...");
    const P3Address = await upgrades.prepareUpgrade(proxyAddress, P3);
    console.log("Phase3 deployed at:", P3Address);
  }
   
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });