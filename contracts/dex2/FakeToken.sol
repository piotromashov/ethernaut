import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("FakeToken", "FK") {
        _mint(msg.sender, initialSupply);
    }
}