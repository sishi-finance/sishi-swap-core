pragma solidity =0.5.16;

import '../SishiswapERC20.sol';

contract ERC20 is SishiswapERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
