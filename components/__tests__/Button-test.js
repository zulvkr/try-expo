import { Button } from '@/components/Button'
import renderer from 'react-test-renderer'

describe(`<Button children="Hello, World!" />`, () => {
  it('should render without crashing', () => {
    const tree = renderer.create(<Button children='Hello, World!' />).toJSON()
    expect(tree.children[0].children[0].children[0]).toBe('Hello, World!')
  })
})

describe(`<Button children="Hello, World!" />`, () => {
  it('should has correct color in light theme', () => {
    const tree = renderer.create(<Button children='Hello, World!' />).toJSON()
    expect(tree.props.style.backgroundColor).toBe('#B80C93')
  })
})
