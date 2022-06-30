import styled from "styled-components";

import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
    transition: transform 150ms;
    &:hover {
    transform: scale(1.1);
  }
`;

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 28px;
  height: 28px;
  position: relative;
  bottom: 2px;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 11.5px;
  font-weight: bold;
  bottom: 13px;
`;
