import styled from "styled-components"

export const AlugarButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }
`

export const DesalugarButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme['red-700']};
    transition: background-color 0.2s;
  }
`