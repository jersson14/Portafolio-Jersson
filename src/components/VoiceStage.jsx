import { FaMicrophone, FaStop } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import RobotFace from './RobotFace';

const MOOD = { listening: 'listen', transcribing: 'think', thinking: 'think', speaking: 'talk', paused: 'idle' };

/* Escenario del modo conversación: el robot en grande y su estado. */
const VoiceStage = ({ stage, ringRef, onTap, onEnd }) => {
  const { t } = useLanguage();
  const mood = MOOD[stage] || 'idle';
  return (
    <div className="voice-stage" data-stage={stage}>
      <button type="button" className="voice-robot" onClick={onTap} aria-label={t(`voice.tap_${stage}`)}>
        <span className="voice-ring" ref={ringRef} aria-hidden="true" />
        <span className="voice-ring voice-ring-2" aria-hidden="true" />
        <RobotFace mood={mood} className="voice-face" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="voice-status" role="status">{t(`voice.${stage}`)}</p>
        <p className="voice-hint">{t(`voice.hint_${stage}`)}</p>
        <div className="flex gap-2 mt-2.5">
          {stage === 'paused' && (
            <button type="button" className="agent-cta" onClick={onTap}><FaMicrophone size={12} /> {t('voice.talk')}</button>
          )}
          <button type="button" className="agent-cta" onClick={onEnd}><FaStop size={11} /> {t('voice.end')}</button>
        </div>
      </div>
    </div>
  );
};

export default VoiceStage;
