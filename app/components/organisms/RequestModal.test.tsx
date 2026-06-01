import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RequestModal from './RequestModal'

describe('RequestModal', () => {
  it('renders form fields', () => {
    render(<RequestModal onClose={vi.fn()} />)
    expect(screen.getByPlaceholderText('Which asset do you need?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. Sales, Finance, Product…')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Describe why you need access and how you'll use it…")).toBeInTheDocument()
  })

  it('renders submit and cancel buttons', () => {
    render(<RequestModal onClose={vi.fn()} />)
    expect(screen.getByText('Submit request')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls onClose when Cancel is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<RequestModal onClose={onClose} />)
    await user.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('pre-fills asset name when assetName prop is given', () => {
    render(<RequestModal assetName="Revenue KPI" onClose={vi.fn()} />)
    expect(screen.getByPlaceholderText('Which asset do you need?')).toHaveValue('Revenue KPI')
  })

  it('shows 3 Required errors on empty submit', async () => {
    const user = userEvent.setup()
    render(<RequestModal onClose={vi.fn()} />)
    await user.click(screen.getByText('Submit request'))
    expect(screen.getAllByText('Required')).toHaveLength(3)
  })

  it('removes asset error when asset field is filled', async () => {
    const user = userEvent.setup()
    render(<RequestModal onClose={vi.fn()} />)
    await user.click(screen.getByText('Submit request'))
    expect(screen.getAllByText('Required')).toHaveLength(3)
    await user.type(screen.getByPlaceholderText('Which asset do you need?'), 'Revenue')
    expect(screen.getAllByText('Required')).toHaveLength(2)
  })

  it('shows success state after filling all fields and submitting', async () => {
    const user = userEvent.setup()
    render(<RequestModal onClose={vi.fn()} />)
    await user.type(screen.getByPlaceholderText('Which asset do you need?'), 'Revenue KPI')
    await user.type(screen.getByPlaceholderText('e.g. Sales, Finance, Product…'), 'Finance')
    await user.type(screen.getByPlaceholderText("Describe why you need access and how you'll use it…"), 'For reporting.')
    await user.click(screen.getByText('Submit request'))
    expect(screen.getByText('Request sent')).toBeInTheDocument()
    expect(screen.getByText(/Revenue KPI/)).toBeInTheDocument()
  })

  it('calls onClose when Done is clicked after success', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<RequestModal onClose={onClose} />)
    await user.type(screen.getByPlaceholderText('Which asset do you need?'), 'Revenue KPI')
    await user.type(screen.getByPlaceholderText('e.g. Sales, Finance, Product…'), 'Finance')
    await user.type(screen.getByPlaceholderText("Describe why you need access and how you'll use it…"), 'For reporting.')
    await user.click(screen.getByText('Submit request'))
    await user.click(screen.getByText('Done'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not show success state when form is invalid', async () => {
    const user = userEvent.setup()
    render(<RequestModal onClose={vi.fn()} />)
    await user.click(screen.getByText('Submit request'))
    expect(screen.queryByText('Request sent')).not.toBeInTheDocument()
  })
})
