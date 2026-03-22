import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { Switch } from '@/components/ui/switch'

describe('Switch', () => {
  it('should render unchecked', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('should render checked', () => {
    render(<Switch checked onCheckedChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('should call onCheckedChange with true when clicked from unchecked', () => {
    const onCheckedChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('should call onCheckedChange with false when clicked from checked', () => {
    const onCheckedChange = vi.fn()
    render(<Switch checked onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('should merge className onto the root', () => {
    render(
      <Switch
        checked={false}
        onCheckedChange={() => {}}
        className="test-switch-extra"
        data-testid="switch-root"
      />
    )
    expect(screen.getByTestId('switch-root')).toHaveClass('test-switch-extra')
  })
})
