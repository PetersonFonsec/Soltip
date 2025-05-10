use anchor_lang::prelude::*;

declare_id!("AjaZZSteWKGJxUWMZ5PGBnCcTCQvk8Wy6kzTdqpC1kVE");

#[program]
pub mod soltip_2 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
