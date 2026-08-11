import Card from '../Card'

function FeedbackCard({ feedback, message }) {
  return (
    <Card variant={feedback.variant}>
      <p className="feedback__title" style={{ color: feedback.titleColor }}>
        {feedback.title}
      </p>
      <p className="feedback__message">{message}</p>
    </Card>
  )
}

export default FeedbackCard
