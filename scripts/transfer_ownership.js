async function main() {

  const newOwnerOfTheProxyAdmin = '0xA66EE329c6Ba250c52D8c89C7055903f8479DfcE';   // TimeLock address
 
  console.log("Transferring ownership of ProxyAdmin...");       // The owner of the ProxyAdmin can upgrade our contracts
  await upgrades.admin.transferProxyAdminOwnership(newOwnerOfTheProxyAdmin);
  console.log("Transferred ownership of ProxyAdmin to:", newOwnerOfTheProxyAdmin);
 
  }
  
 main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });