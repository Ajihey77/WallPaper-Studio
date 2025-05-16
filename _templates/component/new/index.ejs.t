---
to: <%= name %>.tsx
---

import React from 'react';

export default function <%= h.changeCase.pascal(h.path.basename(name)) %>() {
  return <div><%= h.changeCase.pascal(h.path.basename(name)) %> works!</div>;
}
