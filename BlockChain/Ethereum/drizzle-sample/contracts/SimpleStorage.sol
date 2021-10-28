// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
    uint256 public storedData;
    event Change(string message, uint indexed newVal);

    // constructor(uint x) public {
    //     storedData = x;
    // }

    function set(uint256 x) public {
        require(x < 5000,"Shuld be less than 5000");
        storedData = x;

        emit Change("set",x);
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
