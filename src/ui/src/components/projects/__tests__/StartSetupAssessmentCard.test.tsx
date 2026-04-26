// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { StartSetupAssessmentCard } from '@/components/projects/CreateProjectDialog'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('@/lib/plugins/markdown-viewer/components/MarkdownRenderer', () => ({
  default: ({ content, className }: { content: string; className?: string }) => (
    <article data-testid="markdown-plan" className={className}>{content}</article>
  ),
}))

describe('StartSetupAssessmentCard', () => {
  it('renders durable markdown launch plans from SetupAgent', () => {
    render(
      <StartSetupAssessmentCard
        locale="zh"
        session={{
          suggestedForm: null,
          fitAssessment: {
            verdict: 'provisional_autonomous',
            reason: '这个任务可以在机器内闭环推进，但需要确认 GPU 范围。',
          },
          recommendedWorkspaceMode: 'provisional_autonomous',
          launchReadiness: 'needs_confirmation',
          missingConfirmations: ['可用 GPU 是几张？'],
          previewPlan: {
            markdown: '## 启动预览计划\n\n### 1. 模式建议\n- 推荐：暂可全自动但需确认',
            phases: [
              {
                title: 'Baseline / 起点可信化',
                goal: '先确认可复现实验入口。',
                deliverable: '可信 baseline 记录',
                switch_condition: '如果数据缺失则回到协作模式。',
              },
            ],
          },
        }}
      />
    )

    expect(screen.getByText('可启动但需确认')).toBeInTheDocument()
    expect(screen.getByText('Markdown 预览规划')).toBeInTheDocument()
    expect(screen.getByTestId('markdown-plan')).toHaveTextContent('## 启动预览计划')
    expect(screen.getByText('Baseline / 起点可信化')).toBeInTheDocument()
  })
})
