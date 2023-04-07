// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.18;

library DataTypes {

    struct CreateKProfileParams {
        address to;
        string identity;
        string avatar;
        string metadata;
        address operator;
    }
    struct KProfileStruct {
        string identity;
        string avatar;
    }
}