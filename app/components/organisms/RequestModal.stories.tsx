import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, fn } from '@storybook/test'
import RequestModal from './RequestModal'

const meta = {
  title: 'Organisms/RequestModal',
  component: RequestModal,
  tags: ['autodocs'],
  args: { onClose: fn() },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen bg-black/40 p-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RequestModal>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: { assetName: '' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('form fields are visible', async () => {
      await expect(canvas.getByPlaceholderText('Which asset do you need?')).toBeInTheDocument()
      await expect(canvas.getByPlaceholderText('e.g. Sales, Finance, Product…')).toBeInTheDocument()
      await expect(canvas.getByPlaceholderText('Describe why you need access and how you\'ll use it…')).toBeInTheDocument()
    })

    await step('submit button is visible', async () => {
      await expect(canvas.getByText('Submit request')).toBeInTheDocument()
    })
  },
}

export const Prefilled: Story = {
  args: { assetName: 'Revenue Growth KPI' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const assetInput = canvas.getByPlaceholderText('Which asset do you need?')
    await expect(assetInput).toHaveValue('Revenue Growth KPI')
  },
}

// ─── Integration tests ───────────────────────────────────────────────────────

export const ValidationErrors: Story = {
  args: { assetName: '' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('submit empty form → 3 "Required" errors appear', async () => {
      await userEvent.click(canvas.getByText('Submit request'))
      const errors = canvas.getAllByText('Required')
      await expect(errors).toHaveLength(3)
    })

    await step('filling asset field removes that error', async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('Which asset do you need?'),
        'Revenue KPI'
      )
      await expect(canvas.getAllByText('Required')).toHaveLength(2)
    })
  },
}

export const SuccessFlow: Story = {
  args: { assetName: '' },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('fill asset name', async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('Which asset do you need?'),
        'Revenue Growth KPI'
      )
    })

    await step('fill team / area', async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('e.g. Sales, Finance, Product…'),
        'Finance'
      )
    })

    await step('fill reason', async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('Describe why you need access and how you\'ll use it…'),
        'Needed for quarterly review and board reporting.'
      )
    })

    await step('submit form → success state shown', async () => {
      await userEvent.click(canvas.getByText('Submit request'))
      await expect(canvas.getByText('Request sent')).toBeInTheDocument()
      await expect(
        canvas.getByText((_, el) => el?.textContent?.includes('Revenue Growth KPI') ?? false)
      ).toBeInTheDocument()
    })

    await step('click Done → onClose called', async () => {
      await userEvent.click(canvas.getByText('Done'))
      await expect(args.onClose).toHaveBeenCalledTimes(1)
    })
  },
}

export const CancelButton: Story = {
  args: { assetName: '' },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('cancel button is visible', async () => {
      await expect(canvas.getByText('Cancel')).toBeInTheDocument()
    })

    await step('click Cancel → onClose called', async () => {
      await userEvent.click(canvas.getByText('Cancel'))
      await expect(args.onClose).toHaveBeenCalledTimes(1)
    })
  },
}

export const PrefilledAndSubmit: Story = {
  args: { assetName: 'Revenue Growth KPI' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('asset name is pre-filled', async () => {
      await expect(
        canvas.getByPlaceholderText('Which asset do you need?')
      ).toHaveValue('Revenue Growth KPI')
    })

    await step('fill remaining fields', async () => {
      await userEvent.type(
        canvas.getByPlaceholderText('e.g. Sales, Finance, Product…'),
        'Analytics'
      )
      await userEvent.type(
        canvas.getByPlaceholderText('Describe why you need access and how you\'ll use it…'),
        'Dashboard reporting'
      )
    })

    await step('submit → success shows pre-filled asset name', async () => {
      await userEvent.click(canvas.getByText('Submit request'))
      await expect(canvas.getByText('Request sent')).toBeInTheDocument()
      await expect(canvas.getByText('Revenue Growth KPI')).toBeInTheDocument()
    })
  },
}
