import React from 'react'
import styled, { css } from 'styled-components'

const SearchBarInput = styled.input(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.secondary};
    border-radius: 0.5rem;
    color: ${colors.primary.main};
    height: 2rem;
  `,
)

const SearchBar = ({ onChange, ...props }, ref) => {
  const handleChange = ev => {
    if (onChange) onChange(ev)
  }

  return <SearchBarInput {...props} onChange={handleChange} ref={ref} />
}

export default React.forwardRef(SearchBar)
