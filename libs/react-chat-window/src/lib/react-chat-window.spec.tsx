import { render } from '@testing-library/react';

import ReactChatWindow from './react-chat-window';

describe('ReactChatWindow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactChatWindow />);
    expect(baseElement).toBeTruthy();
  });
});
